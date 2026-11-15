import { useState,useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getBlogs,deleteBlog } from "../services/blogService";

function BlogListPage(){
    const {user,logout}=useAuth()
 const [blogs,setBlogs]=useState()
const [loading,setLoading]=useState(true)
}