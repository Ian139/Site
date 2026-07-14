const post = document.getElementById("post-content");
const source = post.dataset.markdown;

async function loadPost() {
	try {
		const response = await fetch(source);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		post.innerHTML = marked.parse(await response.text());
		post.querySelectorAll("table").forEach((table) => {
			const wrapper = document.createElement("div");
			wrapper.className = "table-scroll";
			wrapper.tabIndex = 0;
			wrapper.setAttribute("role", "region");
			wrapper.setAttribute("aria-label", "Scrollable table");
			table.before(wrapper);
			wrapper.append(table);
		});
	} catch (error) {
		console.error("Error loading post:", error);
		post.innerHTML = '<p class="post-status" role="alert">This post could not be loaded. Please try again later.</p>';
	} finally {
		post.removeAttribute("aria-busy");
	}
}

loadPost();
