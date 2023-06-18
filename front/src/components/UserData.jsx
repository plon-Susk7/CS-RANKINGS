
 

const UserData = (props) => {
    return (
        <>
            {
                props.users.map((curUser) => {

                    const {Rank, Name,'TLR(100)': TLR,
                    'RPC(100)': RPC,
                    'GO(100)': GO,
                    'OI(100)': OI,
                    'PERCEPTION(100)': PERCEPTION,'Institute ID':id} = curUser;
                    // const {street, city, zipcode} = curUser.addressRank
                    return (
                        <tr key={id}>
                            <td>{Rank}</td>
                            <td>{Name}</td>
                            {props.ch1 === true ? <td>{TLR}</td> : <td></td>}
                            {props.ch2 === true ? <td>{RPC}</td> : <td></td>}
                            {props.ch3 === true ? <td>{GO}</td> : <td></td>}
                            {props.ch4 === true ? <td>{OI}</td> : <td></td>}
                            {props.ch5 === true ? <td>{PERCEPTION}</td> : <td></td>}
                        </tr>
                    )
                })

            }
        </>
    )
}
export default UserData;