import React, { Component } from 'react';

export class UserData {
    userId: number = 0;
    firstname: string = "";
    surname: string = "";
    email: string = "";
    password: string = "";
    confirmpassword: string = "";
}

interface AddUserDataState {
    title: string;
    loading: boolean;
    userData: UserData;
}