import React from 'react';

export const Home = ( {data} ) => {
    return (
        <div>
            <h1>Home</h1>
            <p>{ data.hello }</p>
        </div>
    );
}