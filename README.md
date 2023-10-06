# Feedr Technical Challenge

Thank you for taking the time to attempt this challenge.

These tests are used to evaluate candidates of all skill levels so please complete them to a level you feel is an accurate representation of your skill set.

Please read `README-FRONTEND.md` for further instructions.

If you have any questions or would like to clarify any details, please email richard.stevens@feedr.co.

Good luck!

# Quick Start
Fork the repository, clone it to your local system, then:

## Install dependencies
yarn (or npm install)

## Start development server
yarn dev (or npm run dev)

## Run tests
yarn test (or npm run test)


## Notes

 - I chose to add a random id to the item state when the user adds it to preview so that the user is able to specifically allow the user to remove a specific product even if there are duplicate products in preview
 - Kept the CSS fairly simple but chose to improve the css in places where its a little confusing for the user, for example the dietary tags and the dietary hud, I chose to make them stand out a bit and I chose to remove some margins so it was flush with the alignment of the text.
 - I wanted to keep state management fairly simple and straightforward, I chose not to opt for any extra logic than was needed for this task as I felt that keeping it simple and scalable is often the key for a task like this
 - Testing wise I ran into a lot of problems, this is where i spent most of my time trying to debug various errors i was getting. If I had more time I would write more tests. I ran into a couple setup issues along the way and I eventually opted to go very simple and bare with the tests since setting up other testing libraries was proving to be time consuming, so I wrote tests in a way I wasn't too used to and I opted to go heavy on test-ids