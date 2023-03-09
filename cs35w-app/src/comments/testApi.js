export const getComments = async () => {
    return [
    {
        id: "1",
        body: "A Comment",
        username: "Pato",
        userId:"1",
        parentId: null,
        time: "2022",
    },
    {
        id: "2",
        body: "Another Comment",
        username: "Rafo",
        userId: "2",
        parentId: null,
        time: "2023",
    },
    {
        id: "3",
        body: "Last Comment",
        username: "Ero",
        userId: "3",
        parentId: "2",
        time: "2023",
    },
    ];
};