import './member.scss'

export default function member({ name,job,description,img,el,firstName,lastName,icon }) {

    return (
    <div className={"presentationequipe__presentationmemeber"}>
        <img className={"presentationequipe__presentationmemeber__img"} src={img ? img : "../icon/DirecteurG.png"} alt="member" />
        <div className={"presentationequipe__presentationmemeber__name"}>{firstName+" "+lastName}</div>
        <div className={"presentationequipe__presentationmemeber__poste"}>{job}</div>
        <img style={{width: '50px', borderRadius: '50px'}} className={"presentationequipe__presentationmemeber__icon"} src={icon} alt="alt"></img>
        {/* <div className={"presentationequipe__presentationmemeber__ligne"}>_______</div>
        <div className={"presentationequipe__presentationmemeber__description"}>{description}</div> */}
    </div>
    );
}