import AddEntry from "./AddEntry";
import AddQueue from "./AddQueue";

const BusinessPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const business_data = await res.json();
    console.log(business_data);
    console.log(Array.isArray(business_data));
    const openModal = () => {
      const modal = document.getElementById('my_modal_3');
      if (modal) {
          modal.showModal();
      }
  }
  return (
    <>
      <div className="px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-5 gap-4 w-full">
          <div className="card bg-base-100 shadow-xl col-span-3 overflow-hidden w-full">
            <div className="card-body">
            <h1 className="card-title text-xl">Add Entry</h1>
            <AddEntry business_data={business_data}/>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl col-span-2 overflow-hidden w-full">
            <div className="card-body">
            <h1 className="card-title text-xl">Estimate Time</h1>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
         <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <div className="card-title justify-between">
              <h2>All Queue</h2>
              <AddQueue business_data={business_data} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {business_data.map(business => (
                <div className="card bg-base-100 max-w-md h-100 shadow-xl" key={business.id}>
                  <div className="card-body">
                    <h2 className="card-title">{business.name}</h2>
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