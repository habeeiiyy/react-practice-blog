import { useState,useEffect } from "react";
import { Link,useNavigate,useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getBlogById,createBlog,updateBlog } from "../services/blogService";

function BlogFormPage(){
    const {id}=useParams()
    const isEditing=Boolean(id)
    const navigate=useNavigate()
    const {user}=useAuth()

    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const[error,setError]=useState("")
    const[loadError,setLoadError]=useState("")
    const [isLoadingPost, setIsLoadingPost] = useState(Boolean(id));

const [isSaving, setIsSaving] = useState(false);

useEffect(()=>{
    if (!id) return;

    async function loadBlog(){
        try{
            const  blog=await getBlogById(id)
            if(!blog){
                setLoadError("Blog post not found")
                return
            }
            if(blog.authorUid!==user.uid){
                setLoadError("you can only edit your own posts")
                return
            }
            setTitle(blog.title)
            setContent(blog.content)
        }catch(error){
            setLoadError("Could not load this blog post")
        }finally{
            setIsLoadingPost(false)
        }
    }
    loadBlog()
},[id,user.uid])


async function handleSubmit(event){
    event.preventDefault()
    setError("")
    const cleanTitle=title.trim()
    const cleanContent=content.trim()

    if(!cleanTitle||!cleanTitle){
        setError("please eneter both title and content")
        return
    }
    setIsSaving(true)
    try{
        if(isEditing){
            await updateBlog(id,{
                title:cleanTitle,content:cleanContent
            })
        }else{
            await createBlog({title:cleanTitle,content:cleanContent},user.uid)
        }
        navigate("/blogs")
    }catch(error){
        setError("could not save the blog post")
    }finally{
        setIsSaving(false)
    }
}
if(isLoadingPost){
    return<main className="page">Loading blog post...</main>
}

if(loadError){
    return(
        <main className="page">
            <p className="error">{loadError}</p>
            <link to="/blogs">Back to blogs</link>
        </main>
    )
}

}