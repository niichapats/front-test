import AddEntry from "./AddEntry";
import AddQueue from "./AddQueue";

const BusinessPage = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/business/all-customers-entries/');
    const business_data = await res.json();
    console.log(business_data);
    console.log(Array.isArray(business_data));
  return (
    <>
      <div className="px-4 md:px-8 lg:px-12 bg-[#FEF9F2] min-h-screen">
        <div className="grid grid-cols-5 gap-4 w-full">
          <div className="card bg-base-100 shadow-xl col-span-3 h-76 overflow-hidden w-full bg-[#DFF2EB]">
            <div className="card-body">
            <h1 className="card-title text-xl">Add Entry</h1>
            <AddEntry business_data={business_data}/>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl col-span-2 h-76 overflow-hidden w-full bg-[#B9E5E8]">
            <div className="card-body">
            <h1 className="card-title text-xl">Estimate Time</h1>
            </div>
          </div>
        </div>
        <div className="pt-6"/>
         <div className="card bg-base-100 w-full shadow-xl bg-[#A2D2DF]">
          <div className="card-body">
            <div className="card-title justify-between">
              <h2>All Queue</h2>
              <AddQueue business_data={business_data} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {business_data.map(business => (
                <div className="card bg-base-100 max-w-md h-100 shadow-xl" key={business.id}>
                  <div className="card-body">
                    <h2 className="card-title">{business.queue.name}</h2>
                    <h4 className="card-body">{business.name}</h4>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessPage