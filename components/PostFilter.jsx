import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySeleect from "./UI/select/MySeleect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeHolder="Поиск...."
            />
            <MySeleect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]}
            />


        </div>
    );
};

export default PostFilter;