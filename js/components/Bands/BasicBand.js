import "./band.scss"


export default function BasicBand({ children, reverse = false }) {

    return(
        <div className={(reverse)? "band basic reverse" : "band basic"}>
            <div className={"band-wrapper"}>
                {children}
            </div>
        </div>
    )
}