const materials : {id : number, contentTitle : string}[] = [
    {id: 1, contentTitle: "Chapter 1: Introduction"},
    {id: 2, contentTitle: "Chapter 2: What is a Flywheel"},
    {id: 3, contentTitle: "Midterm Exams"},
    {id: 4, contentTitle: "Chapter 3: Balancing Mass"},
    {id: 5, contentTitle: "Chapter 4: Balancing Reciprocating Mass"},
    {id: 6, contentTitle: "Final Exams"},
]

const dummyText : string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis diam ac diam tempor placerat id id felis. Pellentesque blandit sed ligula eu dictum. Morbi accumsan at risus sed aliquet. Fusce euismod gravida vestibulum. Pellentesque eleifend est sed sapien congue, eget suscipit eros pretium. Integer sed nulla eros. Curabitur pellentesque tellus velit, sit amet placerat enim faucibus et. In fringilla tincidunt lorem id tincidunt. Cras nec massa dapibus ex elementum ornare."

let listStyle : string = "px-10 py-4 bg-navy text-white text-sm font-bold list-none border-b border-white cursor-pointer transition-all hover:bg-kuning hover:text-navy"

const CourseContent = () => {

    return(
        <div className="w-full h-full">
            <h1 className="mb-5">Kinematika dan Dinamika</h1>  
            <div className="flex">
                <div className="basis-1/3 rounded-xl bg-navy overflow-hidden">
                    {materials.map(materialItem => <li className={listStyle} key={materialItem.id}>{shortenText(materialItem.contentTitle, 25)}</li>)}
                </div>
                <div className="ml-4 basis-2/3">
                    <h2>Chapter 1: Introduction</h2>
                    <video controls className="w-full mt-4 rounded-xl">
                        <source src=""></source>
                    </video>
                </div>
            </div>
            <div className="mt-4 w-full">
                <div className="p-4 bg-white rounded-lg">
                    <h3>Link Textbook:</h3>
                    <p>{dummyText}</p>
                    <br></br>
                    <h3>Rangkuman Materi:</h3>
                    <p>{dummyText}</p>
                    <br></br>

                    <div className="w-full justify-center px-20">
                        <button className="py-2 px-4 w-full text-sm bg-navy text-white rounded-full">View More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const shortenText = (text : string, maxLength : number) => {
    const textLength = text.length

    if (textLength > maxLength) {
        return text.substring(0, maxLength).concat("...")
    } else {
        return text
    }
}

export default CourseContent