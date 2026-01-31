
'use client';

import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Sort, Filter, Toolbar } from '@syncfusion/ej2-react-grids';
import { patientData } from '../../data/health_care_Entities';
import { use } from 'react';
import { Query } from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { useRouter } from 'next/navigation';

export default function Patient({ params }: { params: Promise<{ doctorID: string }> }) {

  const router = useRouter();
  const filterSettings: object = { type: 'Excel' };
  const toolbarOptions: any = ['Search'];

  // Retrieve the route params
  const routeParams: any = use(params);

  // Create query to filter appointments for the specific doctor
  const query: any = new Query();
  query.where('DoctorAssigned', 'equal', routeParams.doctorID, true);

  // Template function: Display patients image and name
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

  // Handler for navigation back to home page
  function btnClick() {
    router.push(`/`);
  }

  // Template function: Display Email
  const emailTemplate = ((props: any) => {
    return (
      <div><a href='#'>{props.Email}</a></div>
    )
  })
  return (
    <>
      <h2>Appointment Details</h2>
      <GridComponent
        dataSource={patientData}
        query={query}
        allowSorting={true}
        allowFiltering={true}
        allowPaging={true}
        filterSettings={filterSettings}
        toolbar={toolbarOptions}
        height={400}
      >
        <ColumnsDirective>
          <ColumnDirective field='PatientId' headerText='Patient ID' width='120' isPrimaryKey={true} />
          <ColumnDirective field='Name' headerText='Name' width='150' template={imgTemplate} />
          <ColumnDirective field='Age' headerText='Age' width='80' editType='numericedit' textAlign='Right' />
          <ColumnDirective field='Gender' headerText='Gender' width='120' />
          <ColumnDirective field='Disease' headerText='Health Issue' width='100' />
          <ColumnDirective field='AppointmentDate' headerText='Appointment Date' width='120' format='yMd' textAlign='Right' />
          <ColumnDirective field='TimeSlot' headerText='Time' width='100' textAlign='Right' />
          <ColumnDirective field='Email' headerText='Email Address' width='150' template={emailTemplate} />
          <ColumnDirective field='Contact' headerText='Contact Number' width='150' textAlign='Right' />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Toolbar]} />
      </GridComponent>
      <div className='backbtn'>
        <ButtonComponent cssClass='e-primary' onClick={btnClick}>Home Page</ButtonComponent>
      </div>
    </>
  )
}
