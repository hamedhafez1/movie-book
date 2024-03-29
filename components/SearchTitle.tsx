import React, {FormEvent} from 'react';
import {useRouter} from "next/router";

function SearchTitle() {

    const router = useRouter()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const inputValue = e.currentTarget.q.value.toString()
        if (inputValue.length > 0) {
            router.push(`search?q=${inputValue}`).catch(e => console.error(e))
        }
    }

    return (
        <React.Fragment>
            <div className="search-title">
                <form action="/index.tsx" role="search" className="search-form" onSubmit={handleSubmit}>
                    <input type="text" name="q" className="search-title-input" placeholder="Search IMDb (titles)"
                           autoCapitalize="off" autoCorrect="off" autoComplete="off"/>
                    <button type="submit">
                        <SearchIconSVG/>
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default SearchTitle;

function SearchIconSVG() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                className="ipc-icon ipc-icon--magnify" id="iconContext-magnify" viewBox="0 0 24 24"
                fill="currentColor" role="presentation">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
}