import React, {useEffect, useRef, useState} from "react";
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/BUTTON/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostsForm from "../components/PostsForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/Pagination";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {useObserver} from "../hooks/useObserver";
import MySeleect from "../components/UI/select/MySeleect";


function MySelect(props) {
    return null;
}

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();



    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })


    /*Работат один раз при загрузке */
    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    /*Пост из дочернего компонента */
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }


    return (
        <div className="App">
            <button onClick={fetchPosts}>ТЫКНИ НА МЕНЯ</button>
            <MyButton style={{marginYop: '30px'}} onClick={() => setModal(true)}>
                Создай меня
            </MyButton>
            <MyModal visable={modal} setVisable={setModal}>
                <PostsForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySeleect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue = 'Кол-л єлем на странице'
                options ={[
                    {value: 5, name:'5'},
                    {value: 10, name:'10'},
                    {value: 25, name:'25'},
                    {value: -1, name:'Огласите весь список'},
                ]}
            />
            {/*Оброботка ошибки*/}
            {postError &&
            <h1>Упс что-то произошло=( ${postError}</h1>
            }
            {/*Отрисовка по условию*/}
            <PostList remove={removePost} title={"Дел много не бывает"} posts={sortedAndSearchedPosts}/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />


        </div>
    );
}

export default Posts;
