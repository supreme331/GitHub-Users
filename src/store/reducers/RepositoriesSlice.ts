import {IRepository} from "../../models/IRepository"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchRepositories = createAsyncThunk('repositories/fetchRepositories', async (params:any, thunkAPI) => {
    if (!params) return null
    try {
        const { data } = await axios.get<IRepository[]>(`https://api.github.com/users/${params.login}/repos?page=${params.currentPage}&per_page=21`)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Failed to load repositories. Exceeded the limit of requests per minute.')
    }
})

interface RepositoriesState {
    repositories: IRepository[];
    isFetchingRepositories: boolean;
    error: string;
}

const initialState: RepositoriesState = {
    repositories: [],
    isFetchingRepositories: false,
    error: '',
}

export const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {},
    extraReducers: {
// loading repositories
        [fetchRepositories.pending.type]: (state: RepositoriesState) => {
            state.isFetchingRepositories = true
        },
        [fetchRepositories.fulfilled.type]: (state: RepositoriesState, action: PayloadAction<IRepository[]>) => {
            state.isFetchingRepositories = false
            state.error = ''
            if (!action.payload) state.repositories = []
            if (action.payload) state.repositories = [...state.repositories, ...action.payload]
        },
        [fetchRepositories.rejected.type]: (state: RepositoriesState, action: PayloadAction<string>) => {
            state.isFetchingRepositories = false
            state.error = action.payload
        },
    }
})

export const {} = repositoriesSlice.actions

export default repositoriesSlice.reducer