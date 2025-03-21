import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    private readonly blogs = [
        {
            id: 1,
            blogTitile: "Blog 1",
            blogUniquKey: "blogUniqueKey1"
        },
        {
            id: 2,
            blogTitile: "Blog 2",
            blogUniquKey: "blogUniqueKey2"
        },
        {
            id: 3,
            blogTitile: "Blog 3",
            blogUniquKey: "blogUniqueKey3"
        },
        {
            id: 4,
            blogTitile: "Blog 4",
            blogUniquKey: "blogUniqueKey4"
        },
        {
            id: 5,
            blogTitile: "Blog 5",
            blogUniquKey: "blogUniqueKey5"
        }
    ];

    findAll(){
        return this.blogs
    }

    findById(id: number){
        return this.blogs.find(blog => blog.id === id)
    }

    findByUniqueKey(key: string){
        return this.blogs.find(blog => blog.blogUniquKey === key)
    }
}
