function generateCode() {
    // Define possible characters for each position
    const characters = {
        first: 'abcdefghijklmnopqrstuvwxyz',
        second: '0123456789',
        third: 'abcdefghijklmnopqrstuvwxyz',
        fourth: '0123456789',
        fifth: 'abcdefghijklmnopqrstuvwxyz'
    };

    // Function to get a random character from a given set
    function getRandomChar(charSet) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        return charSet[randomIndex];
    }

    // Generate the random code
    const code =
        getRandomChar(characters.first) +
        getRandomChar(characters.second) +
        getRandomChar(characters.third) +
        getRandomChar(characters.fourth) +
        getRandomChar(characters.fifth);

    return code;
}
export default generateCode;
