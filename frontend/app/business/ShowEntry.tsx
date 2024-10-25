import AddEntry from "./AddEntry";
import RunQueue from "./RunQueue";

const BusinessPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const business_data = await res.json();
    const five_business_data = business_data.slice(0, 5)
  return (
    <>
      <div className="px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-5 gap-4 w-full">
          <div className="card bg-base-100 shadow-xl col-span-5 overflow-hidden w-full bg-[#F1F6F9]">
            <div className="card-body">
            <h1 className="card-title text-xl text-[#14274E]">Add Entry</h1>
            <AddEntry business_data={five_business_data}/>
            </div>
          </div>
        </div>
        <br></br>
        <div className="grid grid-cols-5 gap-4 w-full">
          <div className="card bg-base-100 shadow-xl col-span-5 overflow-hidden w-full bg-[#F1F6F9]">
            <div className="card-body">
            <h1 className="card-title text-xl text-[#14274E]">Run Queue</h1>
              <RunQueue business_data={five_business_data}/>
            </div>
          </div>
        </div>
        <br></br>
        <div className="grid grid-cols-4 gap-4">
          {five_business_data.map(business => (
            <div className="card bg-base-100 max-w-md h-100 shadow-xl bg-[#F1F6F9]" key={business.id}>
              <div className="card-body">
                <h2 className="card-title">{business.name}</h2>
              </div>
            </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default BusinessPage