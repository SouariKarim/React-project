import classes from "./burger.module.scss";


export default function Burger({
        active,
        handleClick,
        className = undefined,
        theme = 'light'
}) {

    const renderBtnClassName = () => {
        let _classes = classes.btn
        if(active) {
            _classes += " " + classes.active
        }
        if(theme === "dark") {
            _classes += " " + classes.dark
        }
        return _classes
    }


    return(
        <div className={className}>
            <button className={renderBtnClassName()} onClick={handleClick}>
                <span className={classes.s1}/>
                <span className={classes.s2}/>
                <span className={classes.s3}/>
            </button>
        </div>
    )
}