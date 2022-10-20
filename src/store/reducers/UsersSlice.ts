import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IUser} from "../../models/IUser"
import axios from "axios"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params:any, thunkAPI) => {
    try {
        const { data } = await axios.get<IFetchUsers>(`https://api.github.com/search/users?q=${params.searchTerm}&page=${params.currentPage}&per_page=56`)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Failed to load users. Exceeded the limit of requests per minute.')
    }
})

export const fetchFollowingUsers = createAsyncThunk('users/fetchFollowingUsers', async (params:any, thunkAPI) => {
    if (!params) return null
    try {
        const { data } = await axios.get<IUser[]>(`https://api.github.com/users/${params.login}/following?page=${params.currentPage}&per_page=21`)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Failed to load following users. Exceeded the limit of requests per minute.')
    }
})

export const fetchFollowersUsers = createAsyncThunk('users/fetchFollowersUsers', async (params:any, thunkAPI) => {
    if (!params) return null
    try {
        const { data } = await axios.get<IUser[]>(`https://api.github.com/users/${params.login}/followers?page=${params.currentPage}&per_page=21`)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Failed to load followers users. Exceeded the limit of requests per minute.')
    }
})

export const fetchSelectedUser = createAsyncThunk('users/fetchSelectedUser', async (login: string, thunkAPI) => {
    if (!login) return null
    try {
        const { data } = await axios.get(`https://api.github.com/users/${login}`)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Failed to load selected user. Exceeded the limit of requests per minute.')
    }
})

export const fetchRememberedUser = createAsyncThunk('users/fetchRememberedUser', async (login: string, thunkAPI) => {
    try {
        const { data } = await axios.get<IUser[]>(`https://api.github.com/users/${login}`)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Failed to load remembered users. Exceeded the limit of requests per minute.')
    }
})

interface IFetchUsers {
    total_count: number;
    items: IUser[];
}

interface IUserState {
    users: IUser[];
    rememberedUsersLogins: Array<string>;
    rememberedUsers: IUser[];
    followingUsers: IUser[];
    followersUsers: IUser[];
    totalUsersCount: number | null
    selectedUser: IUser | null;
    isFetchingUsers: boolean;
    isFetchingFollowingUsers: boolean;
    isFetchingFollowersUsers: boolean;
    isFetchingSelectedUser: boolean
    isFetchingRememberedUser: boolean
    error: string;
}

const initialState: IUserState = {
    users: [],
    totalUsersCount: null,
    rememberedUsersLogins: [],
    rememberedUsers: [],
    followingUsers: [],
    followersUsers: [],
    selectedUser: null,
    isFetchingUsers: false,
    isFetchingFollowingUsers: false,
    isFetchingFollowersUsers: false,
    isFetchingSelectedUser: false,
    isFetchingRememberedUser: false,
    error: '',
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        initRememberedUsers: (state: IUserState) => {
            const storageItem = localStorage.getItem('rememberedUsersLogins')

            state.rememberedUsersLogins = storageItem ? JSON.parse(storageItem) : []
        },
        addRememberedUser: (state: IUserState, action: PayloadAction<string>) => {
            state.rememberedUsersLogins.push(action.payload)
            localStorage.setItem('rememberedUsersLogins', JSON.stringify(state.rememberedUsersLogins))
        },
        deleteRememberedUser: (state: IUserState, action: PayloadAction<string>) => {
            const loginsIndex = state.rememberedUsersLogins.findIndex((login) => login === action.payload)
            state.rememberedUsersLogins.splice(loginsIndex, 1)
            const rememberedUsersIndex = state.rememberedUsers.findIndex((user) => user.login === action.payload)
            state.rememberedUsers.splice(rememberedUsersIndex, 1)
            localStorage.setItem('rememberedUsersLogins', JSON.stringify(state.rememberedUsersLogins))
        },
    },
    extraReducers: {
        // loading users
        [fetchUsers.pending.type]: (state: IUserState) => {
            state.isFetchingUsers = true
        },
        [fetchUsers.fulfilled.type]: (state: IUserState, action: PayloadAction<IFetchUsers>) => {
            state.isFetchingUsers = false
            state.totalUsersCount = action.payload.total_count
            state.error = ''
            state.users = [...state.users, ...action.payload.items]
        },
        [fetchUsers.rejected.type]: (state: IUserState, action: PayloadAction<string>) => {
            state.isFetchingUsers = false
            state.error = action.payload
        },
        // loading following users
        [fetchFollowingUsers.pending.type]: (state: IUserState) => {
            state.isFetchingFollowingUsers = true
        },
        [fetchFollowingUsers.fulfilled.type]: (state: IUserState, action: PayloadAction<IUser[]>) => {
            state.isFetchingFollowingUsers = false
            state.error = ''
            if (!action.payload) state.followingUsers = []
            if (action.payload) state.followingUsers = [...state.followingUsers, ...action.payload]
        },
        [fetchFollowingUsers.rejected.type]: (state: IUserState, action: PayloadAction<string>) => {
            state.isFetchingFollowingUsers = false
            state.error = action.payload
        },
        // loading followers users
        [fetchFollowersUsers.pending.type]: (state: IUserState) => {
            state.isFetchingFollowersUsers = true
        },
        [fetchFollowersUsers.fulfilled.type]: (state: IUserState, action: PayloadAction<IUser[]>) => {
            state.isFetchingFollowersUsers = false
            state.error = ''
            if (!action.payload) state.followersUsers = []
            if (action.payload) state.followersUsers = [...state.followersUsers, ...action.payload]
        },
        [fetchFollowersUsers.rejected.type]: (state: IUserState, action: PayloadAction<string>) => {
            state.isFetchingFollowersUsers = false
            state.error = action.payload
        },
        // loading selected user
        [fetchSelectedUser.pending.type]: (state: IUserState) => {
            state.isFetchingSelectedUser = true
        },
        [fetchSelectedUser.fulfilled.type]: (state: IUserState, action: PayloadAction<any>) => {
            state.isFetchingSelectedUser = false
            state.error = ''
            state.selectedUser = action.payload
        },
        [fetchSelectedUser.rejected.type]: (state: IUserState, action: PayloadAction<string>) => {
            state.isFetchingSelectedUser = false
            state.error = action.payload
        },
        // loading remembered user
        [fetchRememberedUser.pending.type]: (state: IUserState) => {
            state.isFetchingRememberedUser = true
        },
        [fetchRememberedUser.fulfilled.type]: (state: IUserState, action: PayloadAction<any>) => {
            state.isFetchingRememberedUser = false
            state.error = ''
            state.rememberedUsers.push(action.payload)
        },
        [fetchRememberedUser.rejected.type]: (state: IUserState, action: PayloadAction<string>) => {
            state.isFetchingRememberedUser = false
            state.error = action.payload
        },
    }
})

export const {initRememberedUsers, addRememberedUser, deleteRememberedUser} = usersSlice.actions

export default usersSlice.reducer