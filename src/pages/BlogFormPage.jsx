import { useState,useEffect } from "react";
import { Link,useNavigate,useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getBlogById,createBlog,updateBlog } from "../services/blogService";

function BlogFormPage(){
    const {id}=useParams()
    const isEditing=Boolean(id)
}