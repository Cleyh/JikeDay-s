function formatRule(rawData) {
    // 使用解构赋值从 rawData 中提取需要的字段
    const { list } = rawData;
    title = "bilibili每周视频"
    // 遍历视频列表，生成每个视频的卡片 HTML
    const result = list.map(video => `
    <div class="card">
      <img src="${video.cover}" alt="${video.title}">
      <div class="card-content">
        <h3>${video.title}</h3>
        <p>视频推荐理由：${video.reason}</p>
        <a href="${video.url}" target="_blank">Watch</a>
      </div>
    </div>
  `).join(''); // 使用 join('') 将数组中的所有卡片 HTML 连接成一个字符串

    return title,result;
}