import  './experienceItem.scss'
function ExperienceItem ({content, title , date}) {
    return <div className={"experience_item"}>
    <div className={"leftSide"}>
        <img src="/timeLineCircle.svg" alt="circle" />
        <div className={"line"} >
            <div />
        </div>
    </div>
    <div className={"rightSide"}>
        <div className={"itemTitle"}>
            <span>{title}</span> <span className={"date"}>({date})</span>
        </div>
        <div className={"itemDescription"}>
            {content}
        </div>
    </div>
</div> 
}

export default ExperienceItem