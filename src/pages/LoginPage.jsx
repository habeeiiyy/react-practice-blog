import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function LoginPage(){
    const {login}=useAuth()
    const navigate=useNavigate()

    const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const [error,setError]=useState("")
const [isSubmitting,setIsSubmitting]=useState(false)

async function handleSubmit(event){
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try{
        await login(email,password)
        navigate("/blogs",{replace:true})
    }catch(error){
        setError("Login failed.check your email and password.")
    }finally{
        setIsSubmitting(false)
    }
}
return(
    <main className="page narrow">
<section className="card">
<h1>Blog posting app</h1>

<h2>Login</h2>

{error && <p className="error">{error}</p>}

<form className="form" onSubmit={handleSubmit}>


<label htmlFor="email">Email</label>

<input id="email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)}
placeholder="Enter your email" required/>
  <label htmlFor="password">Password</label>

 <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required/>
<button type="submit" disabled={isSubmitting}>
                                   {isSubmitting ?"signing in...":"Login"}</button>
</form>
</section>

    </main>
)
}
export default LoginPage;