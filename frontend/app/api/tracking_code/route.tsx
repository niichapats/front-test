// import { NextResponse } from "next/server";
// import ApiProxy from "../proxy";
// import { DJANGO_API_ENDPOINT } from "@/config/defaults";


// const DJANGO_API_TRACKCODE_URL=`${DJANGO_API_ENDPOINT}/customer/add-trackcode`

// export async function GET(request){
//     const {data, status} = await ApiProxy.get(DJANGO_API_QUEUE_URL, true)
//     return NextResponse.json(data, {status: status})
// }

// export async function POST(request) {
//     const requestData = await request.json()
//     const {data, status} = await ApiProxy.post(DJANGO_API_TRACKCODE_URL, requestData, true)
//     return NextResponse.json(data, {status: status})
// }   