# Team Ctrl-Alt-Del

## Problem Statement

```
1. Generate health question and answers from 1000+ articles of Bajajfinservhealth.in
Approach: You are expected to read through content from our website and generate question and answers. You can also generate question and answers for the most common questions asked about a particular health topic.
Example : https://www.bajajfinservhealth.in/articles/gut-health
You should be able to generate question and answers based on the content and can also generate most common questions around the topic.
```

## Description

This is the frontend for the Ctrl-Alt-Del project, created with Next.js and TailwindCSS. 
The aim of this project is to generate health questions and answers from 1000+ articles of Bajajfinservhealth.in.

We managed to fetch the data from the internal Bajaj Finserv API, download the articles and parse them into a JSON file.

After downloading the data, we processed the data to generate questions and answers. We used the [question generation library](https://github.com/ramsrigouthamg/Questgen.ai) to generate questions and answers.

We also implemented a question answering system to answer questions regarding the specific health article.

## Features

- Generate questions and answers from the article
- Answer questions regarding the article
- Summarize the article
- Generate FAQs for each article and category
- Search for articles
- Search for categories

## Demo
![image](https://user-images.githubusercontent.com/84540554/217633658-514d91ef-471a-4f06-8be6-8d6f15defed3.png)
![image](https://user-images.githubusercontent.com/84540554/217633718-768c4e1f-e600-43db-8f48-c8eec33f3bc0.png)
![image](https://user-images.githubusercontent.com/84540554/217633756-0b89c26b-fc6a-4bf6-95e8-dd6f77120c19.png)
![image](https://user-images.githubusercontent.com/84540554/217633780-d9c0264d-65ae-4118-bf1b-e11b2467d6bb.png)
![image](https://user-images.githubusercontent.com/84540554/217634041-c44baa1d-3a21-4773-b2db-233207e88db8.png)
![image](https://user-images.githubusercontent.com/84540554/217634216-e6cbe6aa-f533-4a61-a649-27b3c62b8cb5.png)

## System Design
![ctrl alt del](https://user-images.githubusercontent.com/84540554/217634259-d763bbd8-9d80-4ec1-884b-e71f85f599a8.png)

## The article data

The articles that we used in the project will not be made public. However, we have provided a sample of the data that we used in the project.

The `articles` directory tree is as follows:

```
articles
├── article-categories
│   ├── article-category-1
│   │   ├── article-1.json
│   │   ├── article-2.json
│   │   ├── article-3.json
│   │   └── ...
│   ├── article-category-2
│   │   ├── article-1.json
│   │   ├── article-2.json
│   │   ├── article-3.json
│   │   └── ...
│   └── ...
└── ...
```

For each article, we have the following data:

```json
{
    "id": 0,
    "createdAt": "",
    "content": "",
    "title": "",
    "subtitle": "",
    "status": "",
    "comment_status": "",
    "ping_status": "",
    "slug": "",
    "to_ping": "",
    "pinged": "",
    "updatedAt": "",
    "post_content_filtered": "",
    "comment_count": 0,
    "author": {
        "name": ""
    },
    "attachments": [{
        "id": 0,
        "url": "",
        "mime_type": ""
    }],
    "thumbnail": "",
    "image": {
        "id": 0,
        "url": "",
        "mime_type": ""
    },
    "categories": [{
        "id": 0,
        "name": "",
        "slug": "",
        "icon": {
            "id": 0,
            "url": "",
            "mime_type": ""
        },
        "banner": {
            "id": 0,
            "url": "",
            "mime_type": "",
            "heading": "",
            "description": "",
            "video_id": ""
        },
        "article_banner": {
            "id": 0,
            "url": "",
            "mime_type": "",
            "redirect": ""
        },
        "video_thumbnail": {
            "id": 0,
            "url": "",
            "mime_type": ""
        },
        "is_location_dependent": 0,
        "category_banner_section_video_link": "",
        "description": "",
        "category_faq_id": "",
        "clevertap": {
            "event_name": "",
            "source": ""
        },
        "hide_from_health_library": "",
        "wpil_links_inbound_internal_count": "",
        "wpil_links_inbound_internal_count_data": "",
        "wpil_links_outbound_internal_count": "",
        "wpil_links_outbound_internal_count_data": "",
        "wpil_links_outbound_external_count": "",
        "wpil_links_outbound_external_count_data": "",
        "wpil_sync_report3": "",
        "wpil_sync_report2_time": ""
    }],
    "doctorTypes": [],
    "classic-editor-remember": "classic-editor",
    "read_time": "5",
    "selected_device": "Both",
    "list_of_references": "",
    "meta_title": "",
    "meta_description": "",
    "custom_author_name": "",
    "doctor_id": "",
    "cta_banner": {
        "title": "",
        "is_available": "",
        "link": "",
        "details": ""
    },
    "references_list": "",
    "post_thumbnail": "",
    "synopsis": "",
    "table_of_content": [],
    "faq_faq_question": "",
    "faq_faq_answer": "",
    "faq": [{
        "question": "",
        "answer": ""
    }],
    "wpil_sync_report3": "",
    "wpil_links_inbound_internal_count": "",
    "wpil_links_inbound_internal_count_data": "",
    "wpil_links_outbound_internal_count": "",
    "wpil_links_outbound_internal_count_data": "",
    "wpil_links_outbound_external_count": "",
    "wpil_links_outbound_external_count_data": "",
    "wpil_sync_report2_time": "",
    "summaries": [],
    "summarize": ""
}
```
## Installation (This repository is only for the frontend)

1. Clone the repository
2. Install the dependencies using `npm install`
3. Run the development server using `npm run dev`

- Remember to add the `.env` file in the root directory with the following variables:
  - `NGROK_URL` - The URL of the ngrok server (or any other tunneling service for the backend)

- The method used to fetch the data from the Bajaj Finserv API is not included in this repository.

## Contributors


<table>
  <tr align="center">
    <td> Vaishnav <p align="center">
        <img src="https://avatars.githubusercontent.com/vaishnav-mk" height="120" alt="vaishnav-mk">
      </p>
      <p align="center">
        <a href="https://github.com/vaishnav-mk">
          <img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" />
        </a>
        <a href="https://www.linkedin.com/in/vaishnav-mk/">
          <img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" />
        </a>
      </p>
    </td>
    <td> Alvin Ben Geaorge <p align="center">
        <img src="https://avatars.githubusercontent.com/alvinbengeorge" height="120" alt="alvinbengeorge">
      </p>
      <p align="center">
        <a href="https://github.com/alvinbengeorge">
          <img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" />
        </a>
        <a href="https://www.linkedin.com/in/alvin-ben-george-427383201/">
          <img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" />
        </a>
      </p>
    </td>
    <td> Daniel Biju <p align="center">
        <img src="https://avatars.githubusercontent.com/daniel-biju" height="120" alt="Daniel Biju">
      </p>
      <p align="center">
        <a href="https://github.com/daniel-biju">
          <img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" />
        </a>
        <a href="https://www.linkedin.com/in/daniel-biju/">
          <img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" />
        </a>
      </p>
    </td>
</table>
