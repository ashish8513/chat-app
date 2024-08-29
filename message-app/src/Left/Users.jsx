import React from 'react'
import People from './People'
import useGetAllUsers from '../context/useGetAllUsers'

function Users() {
    const [allUsers, loading] = useGetAllUsers();
    console.log(allUsers)
    return (
        <div>
            <div>
                {/* <h1 className=' px-8 py-2 text-white font-semibol rounded-md '>Messages</h1> */}
                <div>
                    <div className='scrollbar-hidden  overflow-y-auto ' style={{ maxHeight: "calc(90vh - 10vh)" }}>
                        {allUsers.map((user, index) => (
                            <People key={index} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users
