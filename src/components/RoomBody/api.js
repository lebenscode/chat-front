
export const generateMessageGroups = (users, messages) => {
    // todo add date groups

    let authorId = 0; // nonexistent id
    let groupIndex = -1;
    const messageGroups = [];
    messages.forEach(msg => {
        const user = users[msg.author];
        const drawAvatar = authorId !== msg.author;
        if (drawAvatar === true) {
            groupIndex++;
            authorId = msg.author;
        }

        if (!Array.isArray(messageGroups[groupIndex])) {
            messageGroups[groupIndex] = [];
        }

        // if (msg.isLocal === true) {
        //     messageGroups[groupIndex].push({
        //         ...msg,
        //         drawAvatar: false
        //     });
        //     return;
        // }

        messageGroups[groupIndex].push({
            ...msg,
            user,
            drawAvatar
        });
    });

    return messageGroups;
};