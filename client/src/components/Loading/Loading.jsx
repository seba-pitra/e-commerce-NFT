import './Loading.css';

export default function Loading(){
    return (
        <div className="loading-page-container">
            <div className='loading-icon'>
            <div className='triangles-container'>
                <div className="triangles">
                    <div className="tri invert"></div>
                    <div className="tri invert"></div>
                    <div className="tri"></div>
                    <div className="tri invert"></div>
                    <div className="tri invert"></div>
                    <div className="tri"></div>
                    <div className="tri invert"></div>
                    <div className="tri"></div>
                    <div className="tri invert"></div>
                </div>
            </div>
                <h1 className="loading-message">
                Loading..
                </h1>
            </div>
        </div>
    )
}
