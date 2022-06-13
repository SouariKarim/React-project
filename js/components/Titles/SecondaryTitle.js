import "./title.scss"


export default function SecondaryTitle(
    {
        title = "Empty",
        theme = "",
        className = "",
        style
    }) {

    return(
        <h2 className={"custom-title secondary-title " + className + " " + theme} style={style}>
            {title}
        </h2>
    )
}