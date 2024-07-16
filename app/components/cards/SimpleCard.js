import classes from "./cards.module.css"


export function SimpleCard(props){

    return(
        <div className={classes.SimpleCard}>
            <p>{props.metric}</p>
            <p>{props.metricValue}</p>
        </div>
    )
}