import * as actions from '../../../redux/actions'
import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";

export default function UserProfile(props){
    const { id } = props.match.params;
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user); 
    

    // FALTA TRAER EL COMPONENTE PurchaseHistory y pasarle por params las relaciones con buy para q muestre el historial

    useEffect(()=>{
        dispatch(actions.getUserByID(id));
    },[dispatch, id])

    return (
        <section style={{ backgroundColor: '#eee' }}>
        <div className="py-5">
            {console.log(userData)}
            <div>
            <div lg="4">
                <div className="mb-4">
                <div className="text-center">
                    <img
                    src={'/*userData.avatar*/'}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                    {/* falta nombre de usuario  */}
                    <p className="text-muted mb-1">NOMBRE DE USARIO</p>
                    <div className="d-flex justify-content-center mb-2">
                    </div>
                </div>
                </div>
            </div>
            <div lg="8">
                <div className="mb-4">
                <div>
                    <div>
                    <div sm="3">
                        <div>Full Name</div>
                    </div>
                    <div sm="9">
                        <div className="text-muted">{userData.name} {userData.name}</div>
                    </div>
                    </div>
                    <hr />
                    <div>
                    <div sm="3">
                        <div>Email</div>
                    </div>
                    <div sm="9">
                        <div className="text-muted">{userData.email}</div>
                    </div>
                    </div>
                    <hr />
                    <div>
                    <div sm="3">
                        <div>Phone</div>
                    </div>
                    <div sm="9">
                        <div className="text-muted">(097) 234-5678</div>
                    </div>
                    </div>
                    <hr />
                    <div>
                    <div sm="3">
                        <div>Mobile</div>
                    </div>
                    <div sm="9">
                        <div className="text-muted">(098) 765-4321</div>
                    </div>
                    </div>
                    <hr />
                    <div>
                    <div sm="3">
                        <div>Address</div>
                    </div>
                    <div sm="9">
                        <div className="text-muted">Bay Area, San Francisco, CA</div>
                    </div>
                    </div>
                </div>
                </div>

                <div>
                <div md="6">
                    <div className="mb-4 mb-md-0">
                    <div>
                        <div className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</div>
                        <div className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</div>
                        <div className="rounded">
                        <div width={80} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</div>
                        <div className="rounded">
                        <div width={72} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</div>
                        <div className="rounded">
                        <div width={89} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</div>
                        <div className="rounded">
                        <div width={55} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</div>
                        <div className="rounded">
                        <div width={66} valuemin={0} valuemax={100} />
                        </div>
                    </div>
                    </div>
                </div>

                <div md="6">
                    <div className="mb-4 mb-md-0">
                    <div>
                        <div className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</div>
                        <div className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</div>
                        <div className="rounded">
                        <div width={80} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</div>
                        <div className="rounded">
                        <div width={72} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</div>
                        <div className="rounded">
                        <div width={89} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</div>
                        <div className="rounded">
                        <div width={55} valuemin={0} valuemax={100} />
                        </div>

                        <div className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</div>
                        <div className="rounded">
                        <div width={66} valuemin={0} valuemax={100} />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}