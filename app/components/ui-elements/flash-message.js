import classes from "./ui.module.css"

export default function Flash(props){

    return(
        <div className={classes.response}>{props.message}</div>
    )
}