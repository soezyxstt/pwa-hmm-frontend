import { GoVideo } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";

const CourseItem = (props : any) => {
    const {id, title} = props

    let bgColor : string = "";
    switch (id % 5) {
        case 1:
            bgColor = "bg-merah"
            break
        case 2:
            bgColor = "bg-navy"
            break
        case 3:
            bgColor = "bg-hijau"
            break
        case 4:
            bgColor = "bg-ungu"
            break
        case 0:
            bgColor = "bg-kuning"
            break
        default:
            bgColor = "bg-kuning"
            break

    }

    return(
        <div className="w-1/3 p-4">
            <div className="h-full relative rounded-lg overflow-hidden cursor-pointer shadow-md transition-all hover:scale-105">
                <div className="relative top-0 left-0 z-1 bg-navy min-w-48 min-h-48 h-full">
                </div>
                <div className="absolute bottom-0 left-0 z-2 h-1/3 w-full flex">
                    <div className={"w-4 " + bgColor}></div>
                    <div className="flex-1 flex-col w-full bg-white p-2 rounded-top-lg">
                        <p className="h-3/5 font-bold text-sm overflow-hidden">{title}</p>
                        <div className="flex flex-1 mt-2 justify-end">
                            <div className="p-1">
                                <IoNewspaperOutline />
                            </div>
                            <p>{id*123 + 1}</p>
                            <div className="p-1 ml-2">
                                <GoVideo />
                            </div>
                            <p>{id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseItem