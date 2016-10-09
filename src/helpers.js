export function processTags(tags) {
    // Split input on commas.
    tags = tags.trim().split(',');

    // Remove white-space from tags.
    tags = tags.map(tag => {
        return tag.trim();
    });

    // Remove any empty tags.
    return tags.filter(tag => tag !== '');
}