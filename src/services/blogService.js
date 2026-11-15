import { collection,addDoc,getDoc,getDocs,updateDoc,deleteDoc,doc,query,orderBy,serverTimestamp } from "firebase/firestore";
import {db} from "../firebase"

const blogsCollection=collection(db,"blogs")

export async function getBlogs(){
    const blogsQuery=query(
        blogsCollection,orderBy("createdAt","desc")
    )

    const snapshot=await getDocs(blogsQuery)

    return snapshot.docs.map((blogDocument)=>({
        id:blogDocument.id,
        ...blogDocument.data()
    }))
}
export async function getBlogById(id){
    const blogRef=doc(db,"blogs",id)

    const snapshot=await getDoc(blogRef)

    if(!snapshot.exists()){
        return null
    }

    return {
        id:snapshot.id,
        ...snapshot.data()
    }
} 

export async function createBlog({title,content},userId){
    return addDoc(blogsCollection,{
        title,content,authorUid:userId,createdAt:serverTimestamp(),updatedAt:serverTimestamp()
    })

}

export async function updateBlog(id,{title,content}){
    const blogRef=doc(db,"blogs",id)

    return updateDoc(blogRef,{
        title,content,updatedAt:serverTimestamp()
    })
}

export async function deleteBlog(id){
    const blogRef=doc(db,"blogs",id)

    return deleteDoc(blogRef)
}