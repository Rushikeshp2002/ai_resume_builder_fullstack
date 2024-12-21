/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button"
import{
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ResumeContext } from "@/context/ResumeContext"
import { LayoutGrid } from "lucide-react"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"

import { toast } from "sonner"

const ThemeColor = () => {
    
    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#888888", "#7133FF", "#FF335A", "#33A1FF", 
        "#ff0000", "#e300cc", "#33ffda", "#00399c", "#000000"
    ]

    const {resumeInfo,setResumeInfo} = useContext(ResumeContext)
    const [selectedColor, setSelectedColor] = useState()
    const {resumeId}= useParams();
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color,
        })
        const data={
            data:{
                themeColor:color,
            }
        }
        // GlobalApi.UpdateResumeDetails(resumeId,data).then(resp=>{
        //     console.log(resp);
        //     toast.success('Theme color updated')
        // })
    }

  return (
    
    <Popover>
        <PopoverTrigger asChild>
        <Button className="flex gap-2" variant="outline" size="sm"><LayoutGrid/>Theme</Button>
        </PopoverTrigger>
        <PopoverContent>
            <h2 className="mb-2 text-sm font-bold">Select theme color</h2>
            <div className="grid grid-cols-5 gap-3">
            {colors.map((item,index)=>(
                <div key={index} onClick={()=>onColorSelect(item)}
                className={`h-5 w-5 rounded-full cursor-pointer border hover:border-black ${selectedColor==item&&'border border-black'}`}
                style={{
                    background:item
                }}>
                    
                </div>
            ))}
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default ThemeColor