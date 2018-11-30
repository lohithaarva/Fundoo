export interface Inote {
    collaberator: Array<Object>,
    color: string,
    createdDate: Date,
    description: string,
    id: string,
    imageUrl: string,
    isArchived: boolean,
    isDeleted: boolean,
    isPined: boolean,
    label: Array<Label>,
    linkUrl: string,
    modifiedDate: Date,
    noteCheckLists: Array<checkLists>,
    noteLabels: Array<Label>,
    questionAndAnswerNotes: [object] ,  
     reminder: [Date],
    title: string,
    userId: string
}

export interface Label {
    label: string,
    isDeleted: boolean,
    id: string,
    userId: string,
}
export interface checkLists {
    createdDate: string,
    id: string,
    isDeleted: boolean,
    itemName: string,
    modifiedDate: Date,
    notesId: string,
    status: string

}
