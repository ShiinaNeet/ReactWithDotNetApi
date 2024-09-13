import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulate an API call to get the tokens
        await axios.post("/login", formData).then(response => {
            console.log('Response from Login: ', response);
            login(response.data);
            toast({
                title: "Login",
                description: `You are logged in!`,
                duration: 2000,
                variant: "success",
            });
            navigate("/Products");
        }).catch(error => {
            console.error('Error: ', error)
        });
       
    };

    return (
        <form onSubmit={handleSubmit} className="flex h-screen items-center justify-center text-lg">
            <div className="bg-slate-700 rounded-2xl shadow-emerald-100 shadow-sm p-5 flex flex-col w-1/2">
                <h1 className="text-5xl font-bold py-5 text-center">Login</h1>
                <label className="py-2">Email Address:</label>
                <input
                    className="px-2"
                    type="text"
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    required
                />
                <label className="py-2">Password:</label>
                <input
                    className="px-2"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    required
                />
                <button className="bg-slate-800 text-xl w-fit self-center p-2 w-1/2 hover:bg-slate-500 rounded-lg my-2" type="submit">Login</button>
                <Link to="/register" className="text-blue-400 underline hover:text-blue-300">Register here</Link>
            </div>

        </form>
    );
}

export default Login;