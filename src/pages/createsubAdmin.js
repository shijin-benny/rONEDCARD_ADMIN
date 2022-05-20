import React from 'react'
import Addsubadmincard from 'components/addsubadmincard'
import Sidebar from 'components/Sidebar';
function createsubAdmin() {
  return (
    <>
         <Sidebar />
         <div className="md:ml-64">
    <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                
                </div>
            </div>
            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <Addsubadmincard />
                    </div>
                </div>
            </div>
            </div>
    </>
  )
}

export default createsubAdmin