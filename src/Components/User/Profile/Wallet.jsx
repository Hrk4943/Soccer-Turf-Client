import React from "react";




const Wallet=({wallet})=>{

    return(
        <>
        <div class="bg-white rounded-lg shadow-md p-6">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-bold">Wallet Balance</h2>
    {/* <button class="text-blue-600 hover:text-blue-800">Add Funds</button> */}
  </div>
  <div class="flex items-center mb-4">
    <div class="rounded-full bg-blue-100 p-2">
      <svg class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-gray-600">Current Balance</p>
      <p class="text-lg font-bold">{wallet}</p>
    </div>
  </div>
  {/* <div class="flex items-center">
    <div class="rounded-full bg-green-100 p-2">
      <svg class="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-gray-600">Last Transaction</p>
      <p class="text-lg font-bold">+$250.00</p>
    </div>
  </div> */}
</div>
        </>
    )

}

export default Wallet;