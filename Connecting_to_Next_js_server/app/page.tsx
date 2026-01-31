'use client';

import React, { useEffect } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Search,
  Toolbar,
  Selection,
  Edit,
  Sort,
  Filter,
  DataStateChangeEventArgs,
  DataSourceChangedEventArgs,
} from '@syncfusion/ej2-react-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { useRouter } from 'next/navigation';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export default function HealthCareGrid() {
  const router = useRouter();
  let gridInstance: GridComponent;

  // Template function: Display doctor image and name
  function imgTemplate(props: any): any {
    return (<div>
      {props.DoctorImg === 'userMale' ?
        <div className="empimg">
          <span className="e-userimg sf-icon-Male" />
        </div> :
        <div className="empimg">
          <span className="e-userimg sf-icon-FeMale" />
        </div>
      }
      <span id="Emptext">{props.Name}</span>
    </div>);
  }

  // Template function: Display availability status
  function statusTemplate(props: any) {
    return (<div>{props.Availability === "Available" ?
      <div id="status" className="statustemp e-activecolor">
        <span className="statustxt e-activecolor">{props.Availability}</span>
      </div> :
      <div id="status" className="statustemp e-inactivecolor">
        <span className="statustxt e-inactivecolor">{props.Availability}</span>
      </div>}</div>);
  }

  // Handle appointment button click - navigate to patient page
  function btnClick(props: any) {
    let rowData = (gridInstance as GridComponent).getRowInfo(props.target).rowData;
    let doctorID = (rowData as any).DoctorId;
    router.push(`/patients/${doctorID}`);
  }

  // Template function: Render appointment button
  function appointmentTemplate(props: any) {
    return (<ButtonComponent onClick={btnClick}>View Appointments</ButtonComponent>);
  }

  // Fetch data from server with current state
  const fetchData = async (gridState: any) => {
    const response = await fetch(`/api/health_care?gridState=${encodeURIComponent(JSON.stringify(gridState))}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const res: any = await response.json();
    return res;
  };

  // Load initial data when component mounts
  useEffect(() => {
    if (gridInstance) {
      const initialState = {
        skip: 0,
        take: 12,
        sorted: [],
        where: [],
        search: [],
      };
      fetchData(initialState).then((res) => {
        if (gridInstance) {
          gridInstance.dataSource = res;
        }
      });
    }
  }, []);

  // Handle data state changes (paging, sorting, filtering, searching)
  const dataStateChange = async (args: DataStateChangeEventArgs) => {
    const gridState = {
      skip: args.skip,
      take: args.take,
      sorted: args.sorted,
      where: args.where,
      search: args.search,
    };

    const res: any = await fetchData(gridState);

    // Handle filter requests - apply query filter and use dataSource callback
    if (
      args.action &&
      (args.action.requestType === 'filterchoicerequest' ||
        args.action.requestType === 'filtersearchbegin' ||
        args.action.requestType === 'stringfilterrequest')
    ) {
      (args as any).dataSource(res.result);
    } else {
      // For other Grid actions like paging, sorting, bind directly to grid instance
      gridInstance.dataSource = res;
    }
  };

  // Handle CRUD operations
  const dataSourceChanged = async (args: DataSourceChangedEventArgs) => {
    let url = '/api/health_care';
    let method = 'POST';
    let body: any = {};
    let action = args.action;

    if (args.action === 'add') {
      method = 'POST';
      body = { ...args.data, action: 'add' };
    } else if (args.action === 'edit') {
      method = 'PUT';
      body = { ...args.data, action: 'edit' };
    } else if (args.requestType === 'delete') {
      method = 'DELETE';
      body = { ...args.data, action: 'delete' };
    } else {
      return;
    }
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const result = await response.json();
      args?.endEdit?.();
    }
  };
  const ddData = [{ specialtyName: 'Cardiologist', specialtyId: '1' }, { specialtyName: 'Dermatologist', specialtyId: '2' }, { specialtyName: 'Neurologist', specialtyId: '3' }, { specialtyName: 'Orthopedic', specialtyId: '4' }, { specialtyName: 'Pediatrician', specialtyId: '5' }, { specialtyName: 'Psychiatrist', specialtyId: '6' }];
  const ddparams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(ddData),
      fields: { text: "specialtyName", value: "specialtyName" },
      query: new Query()
    }
  };
  const availabilityData = [{ Availability: 'Available' }, { Availability: 'On Leave' },];
  const availabilityParams = {
    params: {
      actionComplete: () => false,
      dataSource: new DataManager(availabilityData),
      fields: { text: "Availability", value: "Availability" },
      query: new Query()
    }
  };

  // Template function: Display Email
  const emailTemplate = ((props: any) => {
    return (
      <div><a href='#'>{props.Email}</a></div>
    )
  })
  return (
    <div style={{ padding: '20px' }}>
      <h1>Doctors Portal</h1>
      <GridComponent
        ref={(g: any) => { gridInstance = g }}
        height={400}
        dataSource={[]}
        allowPaging={true}
        allowSorting={true}
        allowFiltering={true}
        filterSettings={{ type: 'Excel' }}
        editSettings={{
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          mode: 'Normal',
        }}
        toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search']}
        dataStateChange={dataStateChange}
        dataSourceChanged={dataSourceChanged}
      >
        <ColumnsDirective>
          <ColumnDirective field='DoctorId' headerText='Doctor ID' width='120' isPrimaryKey={true} validationRules={{required: true}}/>
          <ColumnDirective field='Name' headerText='Name' width='150' template={imgTemplate} />
          <ColumnDirective field='Specialty' headerText='Specialty' width='150' editType='dropdownedit' edit={ddparams} />
          <ColumnDirective field='Email' headerText='Email Address' width='150' template={emailTemplate} validationRules={{email: true}}/>
          <ColumnDirective field='Contact' headerText='Contact Number' width='150'/>
          <ColumnDirective field='Availability' headerText='Availability' width='150' template={statusTemplate} editType='dropdownedit' edit={availabilityParams} />
          <ColumnDirective headerText='Appointments' width='150' template={appointmentTemplate} allowEditing={false} />
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Search,
            Toolbar,
            Selection,
            Edit,
            Sort,
            Filter,
          ]}
        />
      </GridComponent>
    </div>
  );
}
