'use server'

import { signIn } from "@/auth";

export async function doLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });
        return response;
    } catch (error) {
        throw new Error(error)
    }
}

export async function doUserRegister(formData) {
    try {
        const response = await fetch(`http://localhost:3001/api/user/register`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: formData.get('password'),
                dateOfBirth: formData.get('dateOfBirth'),
                gender: formData.get('gender')
            })
        });
        return response;
    } catch (error) {
        throw new Error(error)
    }
}

export async function doDirectorRegister(formData) {
    try {
        const response = await fetch(`http://localhost:3001/api/user/register`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });
        return response;
    } catch (error) {
        throw new Error(error)
    }
}