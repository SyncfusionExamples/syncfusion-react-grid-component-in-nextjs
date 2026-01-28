import { Predicate } from '@syncfusion/ej2-data';
import { NextResponse, NextRequest } from "next/server";
import { DataManager, Query } from '@syncfusion/ej2-data';
import { doctorDetails } from '../../data/health_care_Entities';

// Helper function: Apply filtering based on predicates
const performFiltering = (filterArray: any[], query: any) => {
    const predicateCollection = Array.isArray(filterArray) ? filterArray[0] : filterArray;

    if (!predicateCollection || !Array.isArray(predicateCollection.predicates) || predicateCollection.predicates.length === 0) {
        return;
    }

    const condition = (predicateCollection.condition || 'and').toLowerCase();
    const ignoreCase = predicateCollection.ignoreCase !== undefined ? !!predicateCollection.ignoreCase : true;

    let combinedPredicate: any = null;

    predicateCollection.predicates.forEach((p: any) => {
        if (p.isComplex && Array.isArray(p.predicates)) {
            const nested = buildNestedPredicate(p, ignoreCase);
            if (nested) {
                combinedPredicate = combinedPredicate
                    ? (condition === 'or' ? combinedPredicate.or(nested) : combinedPredicate.and(nested))
                    : nested;
            }
            return;
        }

        const singlePredicate: any = new Predicate(p.field, p.operator, p.value, true);
        combinedPredicate = combinedPredicate
            ? (condition === 'or' ? combinedPredicate.or(singlePredicate) : combinedPredicate.and(singlePredicate))
            : singlePredicate;
    });

    if (combinedPredicate) {
        query.where(combinedPredicate);
    }
};

// Helper function: Build nested predicates for complex filtering
function buildNestedPredicate(block: any, ignoreCase: boolean) {
    const condition = (block.condition || 'and').toLowerCase();
    let mergedPredicate: any | null = null;

    block.predicates.forEach((p: any) => {
        let node;
        if (p.isComplex && Array.isArray(p.predicates)) {
            node = buildNestedPredicate(p, ignoreCase);
        } else {
            node = new Predicate(p.field, p.operator, p.value, ignoreCase);
        }
        if (node) {
            mergedPredicate = mergedPredicate
                ? (condition === 'or' ? mergedPredicate.or(node) : mergedPredicate.and(node))
                : node;
        }
    });

    return mergedPredicate;
}

// Helper function: Apply search functionality
const performSearching = (searchParam: any, query: any) => {
    const { fields, key, operator, ignoreCase } = searchParam[0];
    query.search(key, fields, operator, ignoreCase);
};

// Helper function: Apply sorting
const performSorting = (sortArray: any[], query: any) => {
    for (let i = 0; i < sortArray.length; i++) {
        const { name, direction } = sortArray[i];
        query.sortBy(name, direction);
    }
};

// Helper function: Apply paging
const performPaging = (data: any[], gridState: any) => {
    if (!gridState.take || gridState.take <= 0) {
        return data;
    }
    const pageSkip = gridState.skip || 0;
    const pageSize = gridState.take;
    return data.slice(pageSkip, pageSkip + pageSize);
};

// GET - Retrieve all data
export async function GET(request: NextRequest) {

    const gridStateParam = new URL(request.url).searchParams.get('gridState');
    if (!gridStateParam) {
        return NextResponse.json(
            { error: 'gridState parameter is required', result: [], count: 0 },
            { status: 400 }
        );
    }

    const gridState = JSON.parse(decodeURIComponent(gridStateParam));

    const query = new Query();

    // Filtering
    if (gridState.where && Array.isArray(gridState.where) && gridState.where.length > 0) {
        performFiltering(gridState.where, query);
    }

    // Searching
    if (gridState.search && Array.isArray(gridState.search) && gridState.search.length > 0) {
        performSearching(gridState.search, query);
    }

    // Sorting
    if (gridState.sorted && Array.isArray(gridState.sorted) && gridState.sorted.length > 0) {
        performSorting(gridState.sorted, query);
    }

    // Execute query on data
    const resultantData = new DataManager(doctorDetails).executeLocal(query);
    const count: any = resultantData.length;
    let result: any = resultantData;
    
    // Paging
    result = performPaging(result, gridState);

    return NextResponse.json({ result, count });
}

// PUT - Update an existing data
export async function PUT(request: NextRequest) {
    const body = await request.json();
    if (body.action === 'edit') {
        const doctorIndex = doctorDetails.findIndex(u => u.DoctorId === body.DoctorId);
        if (doctorIndex === -1) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 404 }
            );
        }
        doctorDetails[doctorIndex] = {
            ...doctorDetails[doctorIndex],
            Name: body.name || doctorDetails[doctorIndex].Name,
            Specialty: body.Specialty || doctorDetails[doctorIndex].Specialty,
            Experience: body.Experience || doctorDetails[doctorIndex].Experience,
            Availability: body.Availability || doctorDetails[doctorIndex].Availability,
            Email: body.Email || doctorDetails[doctorIndex].Email,
            Contact: body.Contact || doctorDetails[doctorIndex].Contact
        };
        return NextResponse.json(doctorDetails[doctorIndex]);
    }
}

// DELETE - Delete a data
export async function DELETE(request: NextRequest) {
    const body = await request.json();
    if (body.action === 'delete') {
        const doctorID = body[0].DoctorId;
        const doctorIndex = doctorDetails.findIndex(u => u.DoctorId === doctorID);
        if (doctorIndex === -1) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 404 }
            );
        }
        const deletedDoctor = doctorDetails[doctorIndex];
        doctorDetails.splice(doctorIndex, 1);
        return NextResponse.json({ message: "Doctor deleted successfully", doctor: deletedDoctor });
    }
}

// POST - Create a new data
export async function POST(request: NextRequest) {
    const body = await request.json();
    if (body.action === 'add') {
        const newDoctor: any = {
            DoctorId: body.DoctorId,
            Name: body.Name,
            Specialty: body.Specialty,
            Experience: body.Experience,
            Availability: body.Availability,
            Email: body.Email,
            Contact: body.Contact
        };
        doctorDetails.push(newDoctor);
        return NextResponse.json(newDoctor, { status: 201 });
    }
}