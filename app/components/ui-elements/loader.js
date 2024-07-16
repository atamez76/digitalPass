
import classes from "./ui.module.css"

export default function Loader (){
    return (
        <>
        <div className={classes.loader}>
            <div className={classes.loader_element_1}></div>
            <div className={classes.loader_element_2}></div>
            <div className={classes.loader_element_3}></div>
        </div>
        </>
    )
}