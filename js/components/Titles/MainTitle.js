import "./title.scss"


export default function MainTitle(
    {
        children,
        fromHomePage = false,
        theme = "",
        className = "",
        style
    }) {

    return(
        <h1 className={
            (fromHomePage)?
                "custom-title main-title home-slogan " + className + " " + theme :
                "custom-title main-title " + className + " " + theme
            }
            style={style}>
                {children}
        </h1>
    )
}