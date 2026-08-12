export const RICH_CONTENT = `
<h1>Document Title</h1>
<p>This is a paragraph with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s> text.</p>
<h2>Heading 2</h2>
<p>You can write <code>inline code</code> or switch to a full code block:</p>
<pre><code>const greeting = 'Hello, World!';
console.log(greeting);</code></pre>
<h3>Heading 3 — Lists</h3>
<ul>
  <li>Bullet item one</li>
  <li>Bullet item two</li>
  <li>Bullet item three</li>
</ul>
<ol>
  <li>First ordered item</li>
  <li>Second ordered item</li>
  <li>Third ordered item</li>
</ol>
<blockquote>
  <p>This is a blockquote. Great for callouts or citations.</p>
</blockquote>
<hr>
<p style="text-align: center">Centered paragraph below the rule.</p>
`.trim();

export const TASK_CONTENT = `<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"></label><div><p>Design the new editor API</p></div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Implement link extension</p></div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Write Storybook stories</p></div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Add character count footer</p></div></li></ul>`;

export const NESTED_LIST_CONTENT = `
<p>Bullet — each depth gets a distinct marker (disc → circle → square):</p>
<ul>
  <li>Frontend
    <ul>
      <li>React
        <ul>
          <li>Component library</li>
          <li>Design tokens</li>
        </ul>
      </li>
      <li>Styling</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>
<p>Ordered — nested numbering chains the parent's number (1 → 1.1 → 1.1.1), not a/b/c:</p>
<ol>
  <li>Phát hiện vấn đề
    <ol>
      <li>Khảo sát 14 biến thể button
        <ol>
          <li>Ghi lại từng khác biệt</li>
          <li>Xếp theo mức độ trùng lặp</li>
        </ol>
      </li>
      <li>Phỏng vấn các team</li>
    </ol>
  </li>
  <li>Đề xuất giải pháp</li>
  <li>Triển khai</li>
</ol>
`.trim();

export const TABLE_CONTENT = `
<p>Click the table button in the toolbar and pick a size, or edit the sample below:</p>
<table>
  <tr><th>Feature</th><th>Status</th><th>Owner</th></tr>
  <tr><td>Image upload</td><td>Done</td><td>@team</td></tr>
  <tr><td>Tables</td><td>Done</td><td>@team</td></tr>
  <tr><td>Slash commands</td><td>Done</td><td>@team</td></tr>
</table>
`.trim();

export const CODE_HIGHLIGHT_CONTENT = `
<p>Code blocks now ship with syntax highlighting — pick a language from the dropdown that appears while your cursor is inside one:</p>
<pre><code class="language-typescript">function greet(name: string): string {
  return \`Hello, \${name}!\`;
}</code></pre>
<pre><code class="language-python">def greet(name: str) -> str:
    return f"Hello, {name}!"</code></pre>
`.trim();

/**
 * A realistic, long-form blog post exercising every feature at once — multiple heading
 * levels, long paragraphs, lists, a task list, a table, two syntax-highlighted code blocks,
 * two images, links, highlight/color, and horizontal rules. Long enough to require real
 * scrolling, which is what actually exercises the sticky toolbar and the debounced
 * `onChange` path under sustained typing/editing — a single short paragraph never triggers
 * either.
 */
export const LONG_ARTICLE_CONTENT = `
<h1>Xây dựng một hệ thống Design System cho đội ngũ 50 kỹ sư</h1>
<p>Khi một công ty phát triển từ vài kỹ sư lên hàng chục người, <strong>tính nhất quán giao diện</strong> trở thành vấn đề sống còn. Bài viết này ghi lại toàn bộ hành trình xây dựng design system của chúng tôi — từ những quyết định kiến trúc đầu tiên cho đến việc vận hành nó ở quy mô lớn.</p>
<p>Đây không phải là một bài <em>lý thuyết suông</em>. Mọi số liệu, đoạn code, và bảng so sánh dưới đây đều lấy từ hệ thống thật đang chạy production, được <u>đơn giản hóa</u> để dễ trình bày.</p>
<hr>
<h2>1. Bối cảnh và vấn đề</h2>
<p>Trước khi có design system, mỗi team tự implement lại <code>Button</code>, <code>Modal</code>, <code>Input</code> theo cách riêng. Kết quả: 14 phiên bản button khác nhau về padding, 6 cách quản lý màu sắc, và không ai dám refactor vì sợ <s>vỡ trận</s> ảnh hưởng đến các phần khác.</p>
<blockquote>
  <p>"Chúng tôi không thiếu component — chúng tôi thiếu một nguồn sự thật duy nhất (single source of truth)." — Trưởng nhóm Frontend</p>
</blockquote>
<h2>2. Nguyên tắc thiết kế</h2>
<p>Chúng tôi thống nhất một số nguyên tắc cốt lõi trước khi viết dòng code đầu tiên:</p>
<ul>
  <li>Mỗi component chỉ có <strong>một trách nhiệm</strong> — không nhồi nhét quá nhiều prop điều kiện.</li>
  <li>Style luôn đi qua <mark data-color="#fde047" style="background-color: #fde047">design token</mark>, không hard-code màu/spacing trực tiếp.</li>
  <li>Mọi component public đều phải có <a href="https://storybook.js.org" target="_blank" rel="noopener noreferrer">Storybook story</a> trước khi merge.</li>
  <li>Test sống trong story <code>play</code> function — không tách file test riêng.</li>
</ul>
<h2>3. Checklist triển khai</h2>
<p>Đây là checklist thực tế nhóm dùng cho mỗi component mới:</p>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"></label><div><p>Định nghĩa API props và variant</p></div></li>
  <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"></label><div><p>Viết Storybook story cho từng trạng thái</p></div></li>
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Audit accessibility (aria, keyboard nav)</p></div></li>
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Viết migration guide cho team cũ</p></div></li>
</ul>
<h2>4. So sánh trước và sau</h2>
<p>Bảng dưới đây tổng hợp tác động sau 6 tháng áp dụng:</p>
<table>
  <tr><th>Chỉ số</th><th>Trước</th><th>Sau</th><th>Ghi chú</th></tr>
  <tr><td>Số biến thể Button</td><td>14</td><td>1 component, 6 variant</td><td><span style="color: #22c55e">Giảm 90% code trùng lặp</span></td></tr>
  <tr><td>Thời gian build UI mới</td><td>3-5 ngày</td><td>0.5-1 ngày</td><td>Nhờ tái sử dụng token + component</td></tr>
  <tr><td>Bug UI / tháng</td><td>~22</td><td>~4</td><td>Giảm nhờ test tập trung tại 1 nơi</td></tr>
  <tr><td>Onboarding dev mới</td><td>2 tuần</td><td>3 ngày</td><td>Docs tự sinh từ Storybook</td></tr>
</table>
<h2>5. Ví dụ code</h2>
<p>Component <code>Button</code> dùng <code>cva</code> để quản lý variant thay vì rẽ nhánh <code>if/else</code>:</p>
<pre><code class="language-typescript">import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('inline-flex items-center rounded-md font-medium transition-colors', {
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary-strong',
      ghost: 'bg-transparent hover:bg-muted',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

export function Button({ variant, size, ...props }: VariantProps<typeof buttonVariants>) {
  return &lt;button className={buttonVariants({ variant, size })} {...props} /&gt;;
}</code></pre>
<p>Và script kiểm tra token trùng lặp chạy trong CI, viết bằng Python:</p>
<pre><code class="language-python">import json
from collections import Counter

def find_duplicate_tokens(path: str) -> list[str]:
    with open(path) as f:
        tokens = json.load(f)
    values = Counter(tokens.values())
    return [k for k, v in tokens.items() if values[v] > 1]

if __name__ == "__main__":
    dupes = find_duplicate_tokens("design-tokens.json")
    if dupes:
        raise SystemExit(f"Found duplicate token values: {dupes}")</code></pre>
<h2>6. Kiến trúc thư mục</h2>
<p>Ảnh dưới đây minh họa cách chúng tôi chia lớp component (chỉ để minh họa bố cục ảnh trong bài viết dài — trong bản build thật đây là ảnh upload qua <code>onImageUpload</code>):</p>
<img src="https://picsum.photos/seed/architecture-diagram/640/240" alt="Sơ đồ kiến trúc thư mục design system">
<ol>
  <li><code>ui/</code> — primitive không phụ thuộc business logic (Button, Input, Dialog...).</li>
  <li><code>features/</code> — component ghép từ nhiều primitive (DataGrid, SearchModal...).</li>
  <li><code>layouts/</code>, <code>pages/</code> — bố cục cấp cao, đặc thù theo app.</li>
</ol>
<h2>7. Vận hành và bảo trì</h2>
<p>Một hệ thống chỉ sống được nếu có quy trình rõ ràng cho việc thêm/sửa/xóa component. Chúng tôi publish package qua semver nghiêm ngặt, và mọi breaking change đều phải kèm theo migration script.</p>
<img src="https://picsum.photos/seed/release-process/640/240" alt="Biểu đồ quy trình release">
<blockquote>
  <p>Ghi chú vận hành: mỗi release lớn đều có buổi <strong>demo nội bộ</strong> trước khi thông báo breaking change tới toàn bộ team tiêu thụ.</p>
</blockquote>
<hr>
<h2>8. Kết luận</h2>
<p>Design system không phải là một dự án "làm xong rồi thôi" — nó là hạ tầng sống, cần đầu tư liên tục. Nhưng khoản đầu tư đó hoàn toàn xứng đáng: từ 14 biến thể button hỗn loạn, chúng tôi giờ chỉ cần <mark data-color="#86efac" style="background-color: #86efac">một component, sáu variant</mark>, và một nguồn sự thật duy nhất cho toàn bộ 50 kỹ sư.</p>
<p style="text-align: center"><em>Hết bài viết — cảm ơn bạn đã đọc đến đây.</em></p>
`.trim();

/**
 * A distinct, prose-heavy article (~2500 words, no code blocks) for the read-only "published
 * post" story — deliberately a different topic from `LONG_ARTICLE_CONTENT` so the two stories
 * don't feel like the same fixture reused twice. Long enough to be a genuine scroll test for
 * reading typography (paragraph rhythm, headings, blockquotes, lists, table) on its own,
 * without leaning on code/table/image density the way the editing-focused article does.
 */
export const DEEP_WORK_ARTICLE_CONTENT = `
<h1>Deep Work: Lấy lại khả năng tập trung trong một thế giới liên tục xao nhãng</h1>
<p>Có một nghịch lý đang diễn ra âm thầm trong hầu hết các văn phòng hiện đại: chúng ta chưa bao giờ có nhiều công cụ hỗ trợ công việc đến vậy — lịch thông minh, phần mềm quản lý dự án, trợ lý AI, hàng chục ứng dụng nhắn tin — nhưng chưa bao giờ cảm thấy khó hoàn thành một việc quan trọng từ đầu đến cuối đến vậy. Bạn mở máy tính lúc 8 giờ sáng với một danh sách việc rõ ràng, và đến 6 giờ chiều, danh sách đó gần như không nhúc nhích, dù bạn đã "làm việc" liên tục suốt cả ngày.</p>
<p>Vấn đề không nằm ở sự lười biếng hay thiếu kỷ luật. Vấn đề nằm ở cách môi trường làm việc hiện đại được thiết kế: mọi thông báo, mọi tin nhắn, mọi cuộc họp "chỉ 15 phút" đều âm thầm cắt vụn thời gian của bạn thành những mảnh quá nhỏ để có thể tạo ra bất kỳ giá trị sâu sắc nào. Bài viết này không hứa hẹn một công thức thần kỳ, mà tổng hợp lại một cách có hệ thống những gì thực sự hiệu quả — dựa trên khái niệm <strong>Deep Work</strong> (làm việc sâu), một trong những ý tưởng ảnh hưởng nhất về năng suất trong thập kỷ qua.</p>
<hr>
<h2>1. Xao nhãng đang âm thầm đánh cắp thời gian của bạn</h2>
<p>Hãy thử một phép tính nhỏ. Nếu mỗi lần bị gián đoạn — một tin nhắn Slack, một email "khẩn cấp", một câu hỏi bất chợt từ đồng nghiệp — mất trung bình 23 phút để não bộ quay lại đúng trạng thái tập trung trước đó (một con số được nhiều nghiên cứu về sự chú ý trích dẫn), thì chỉ cần 10 lần gián đoạn mỗi ngày, bạn đã mất gần 4 giờ đồng hồ không phải cho việc trả lời tin nhắn, mà cho việc <em>khởi động lại bộ não</em> hết lần này đến lần khác.</p>
<p>Điều đáng sợ hơn là phần lớn những gián đoạn này không đến từ bên ngoài — chúng đến từ chính chúng ta. Ta tự kiểm tra điện thoại. Ta tự mở tab trình duyệt mới "chỉ để xem nhanh". Ta tự chuyển sang đọc email giữa lúc đang viết một đoạn báo cáo khó. Não bộ con người, khi phải đối mặt với một nhiệm vụ đòi hỏi nỗ lực nhận thức cao, có xu hướng tìm kiếm những "phần thưởng dễ dàng" — và không gì dễ dàng hơn việc lướt qua vài thông báo để có cảm giác "đã làm được điều gì đó".</p>
<p>Đây chính là lý do vì sao cảm giác "bận rộn cả ngày nhưng chẳng làm được gì" lại phổ biến đến vậy. Bận rộn không đồng nghĩa với hiệu quả. Nhiều người trong chúng ta đang nhầm lẫn giữa <mark data-color="#fde047" style="background-color: #fde047">hoạt động bận rộn (busyness)</mark> và <mark data-color="#86efac" style="background-color: #86efac">sản xuất giá trị thực sự (deep value creation)</mark> — hai thứ nghe có vẻ giống nhau nhưng lại gần như đối lập nhau về bản chất.</p>
<h2>2. Deep Work là gì, và vì sao nó ngày càng hiếm</h2>
<p>Deep Work được định nghĩa là trạng thái làm việc tập trung cao độ, không bị gián đoạn, hướng toàn bộ năng lực nhận thức vào một nhiệm vụ đòi hỏi tư duy phức tạp — đến mức đẩy khả năng của bạn đến giới hạn. Đối lập với nó là <strong>Shallow Work</strong> (làm việc nông) — những tác vụ mang tính hậu cần, dễ thực hiện, thường bị gián đoạn, và không đòi hỏi nhiều tư duy sâu: trả lời email, cập nhật trạng thái, tham dự các cuộc họp không có nghị trình rõ ràng.</p>
<p>Vấn đề là hai loại công việc này không "trung tính" như nhau về mặt giá trị. Deep Work là nơi tạo ra những sản phẩm khó sao chép — một đoạn code giải quyết một bài toán kiến trúc phức tạp, một chiến lược kinh doanh thực sự khác biệt, một bài viết thay đổi cách người đọc nhìn nhận vấn đề. Shallow Work thì ngược lại: nó dễ học, dễ làm, và vì vậy cũng dễ bị thay thế — bởi người khác, hoặc trong tương lai gần, bởi các công cụ tự động hóa.</p>
<p>Trớ trêu thay, chính vì Shallow Work tạo cảm giác hoàn thành nhanh chóng (dọn hộp thư về 0, đóng dấu "đã xử lý" một loạt yêu cầu nhỏ), nó lại thường được ưu tiên hơn trong lịch làm việc hằng ngày của hầu hết mọi người — trong khi những dự án đòi hỏi Deep Work, thứ thực sự quyết định giá trị dài hạn của một sự nghiệp, lại liên tục bị đẩy xuống "làm sau, khi nào rảnh hơn". Vấn đề là gần như không bao giờ có lúc "rảnh hơn" cả — bạn phải chủ động tạo ra khoảng trống đó.</p>
<blockquote>
  <p>Khả năng tập trung sâu đang trở thành một kỹ năng ngày càng hiếm — và chính vì hiếm, nó ngày càng có giá trị hơn trong một thị trường lao động mà phần lớn công việc nông cạn có thể bị tự động hóa.</p>
</blockquote>
<h2>3. Bốn mô hình lịch làm việc sâu</h2>
<p>Không phải ai cũng có thể — hay nên — áp dụng Deep Work theo cùng một cách. Dưới đây là bốn mô hình phổ biến nhất, xếp theo mức độ "cực đoan" giảm dần:</p>
<ol>
  <li><strong>Mô hình Tu viện (Monastic).</strong> Loại bỏ gần như hoàn toàn Shallow Work khỏi cuộc sống để dồn toàn bộ thời gian cho một mục tiêu duy nhất. Đây là cách tiếp cận của nhiều nhà nghiên cứu, nhà văn ẩn dật — hiệu quả cực cao nhưng gần như không khả thi với người đang đi làm trong một tổ chức cần phối hợp với nhiều người khác.</li>
  <li><strong>Mô hình Song song (Bimodal).</strong> Chia thời gian thành các khối lớn — có thể là vài ngày liên tục, hoặc một mùa trong năm — dành riêng cho Deep Work, xen kẽ với các khối thời gian khác hoàn toàn mở cho Shallow Work và giao tiếp. Phù hợp với người có thể kiểm soát lịch trình của chính mình ở quy mô tuần hoặc tháng.</li>
  <li><strong>Mô hình Nhịp điệu (Rhythmic).</strong> Biến Deep Work thành một thói quen lặp lại đều đặn mỗi ngày — ví dụ 2 giờ đầu buổi sáng, mỗi ngày, không có ngoại lệ. Đây là mô hình thực tế nhất với phần lớn nhân viên văn phòng, vì nó không đòi hỏi phải "biến mất" khỏi công việc trong nhiều ngày liền.</li>
  <li><strong>Mô hình Báo chí (Journalistic).</strong> Tận dụng bất kỳ khoảng trống nào xuất hiện trong ngày để chuyển ngay sang chế độ tập trung sâu — giống như cách một phóng viên phải viết bài ngay khi có thời gian, bất kể đang ở đâu. Đòi hỏi khả năng "chuyển chế độ tư duy" rất nhanh, thường chỉ phù hợp với người đã có nhiều kinh nghiệm thực hành Deep Work.</li>
</ol>
<p>Không có mô hình nào "đúng" tuyệt đối — lựa chọn phụ thuộc vào mức độ tự chủ bạn có với lịch làm việc, và bản chất công việc bạn đang làm. Với phần lớn nhân viên trong một tổ chức, mô hình Nhịp điệu thường là điểm khởi đầu thực tế nhất.</p>
<h2>4. Checklist trước khi bắt đầu một phiên làm việc sâu</h2>
<p>Một phiên Deep Work hiệu quả hiếm khi xảy ra một cách ngẫu nhiên — nó cần được chuẩn bị. Đây là danh sách kiểm tra nhiều người áp dụng trước mỗi phiên:</p>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"></label><div><p>Xác định rõ MỘT mục tiêu cụ thể cho phiên làm việc (không phải danh sách 5 việc)</p></div></li>
  <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"></label><div><p>Tắt thông báo trên mọi thiết bị — không chỉ "im lặng", mà tắt hẳn</p></div></li>
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Đóng toàn bộ tab trình duyệt không liên quan đến nhiệm vụ</p></div></li>
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Đặt hẹn giờ rõ ràng (thường 60–90 phút) để tạo áp lực thời gian lành mạnh</p></div></li>
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Chuẩn bị sẵn nước uống, không gian, ánh sáng — để không phải đứng dậy giữa chừng</p></div></li>
</ul>
<h2>5. So sánh Deep Work và Shallow Work</h2>
<p>Bảng dưới đây tóm tắt sự khác biệt cốt lõi giữa hai chế độ làm việc, dựa trên quan sát thực tế từ nhiều đội ngũ đã thử áp dụng lịch làm việc theo khối thời gian (time-blocking):</p>
<table>
  <tr><th>Tiêu chí</th><th>Deep Work</th><th>Shallow Work</th></tr>
  <tr><td>Mức độ tập trung cần thiết</td><td>Rất cao, không thể gián đoạn</td><td>Thấp, có thể vừa làm vừa nói chuyện</td></tr>
  <tr><td>Giá trị tạo ra</td><td>Khó sao chép, tích lũy theo thời gian</td><td>Dễ thay thế, ít tích lũy</td></tr>
  <tr><td>Ví dụ điển hình</td><td>Thiết kế kiến trúc hệ thống, viết chiến lược, phân tích sâu</td><td>Trả lời email, họp cập nhật trạng thái</td></tr>
  <tr><td>Cảm giác trong lúc làm</td><td>Có thể khó chịu ban đầu, đòi hỏi ý chí</td><td>Dễ chịu, tạo cảm giác "bận rộn"</td></tr>
  <tr><td>Rủi ro nếu bỏ qua hoàn toàn</td><td>Sự nghiệp trì trệ về dài hạn</td><td>Một vài việc nhỏ bị trễ, thường khắc phục được</td></tr>
</table>
<p>Điểm mấu chốt không phải là loại bỏ hoàn toàn Shallow Work — điều đó gần như bất khả thi trong môi trường công sở hiện đại — mà là <strong>chủ động giới hạn thời lượng</strong> nó chiếm trong ngày, thay vì để nó lấp đầy toàn bộ lịch trình một cách mặc định.</p>
<h2>6. Công cụ và kỹ thuật hỗ trợ</h2>
<p>Một số kỹ thuật cụ thể đã được nhiều người áp dụng thành công để bảo vệ thời gian Deep Work:</p>
<ul>
  <li><strong>Time-blocking.</strong> Lên lịch cho từng khối thời gian trong ngày như thể chúng là các cuộc họp không thể hủy — bao gồm cả khối thời gian dành cho Deep Work.</li>
  <li><strong>Quy tắc "không họp trước 11 giờ sáng".</strong> Một số đội ngũ kỹ thuật áp dụng quy tắc này để đảm bảo mọi người có ít nhất một khối thời gian liên tục mỗi sáng.</li>
  <li><strong>Chế độ "Không làm phiền" ở cấp tổ chức.</strong> Thay vì để mỗi cá nhân tự chống chọi với văn hóa phản hồi tức thì, một số công ty thiết lập khung giờ chung mà toàn team đồng thuận không nhắn tin công việc.</li>
  <li><strong>Ghi lại thời gian Deep Work thực tế mỗi tuần.</strong> Chỉ riêng việc đo lường — biết chính xác mỗi tuần bạn có bao nhiêu giờ tập trung thực sự — đã tạo ra động lực cải thiện đáng kể, tương tự hiệu ứng của việc theo dõi chi tiêu cá nhân.</li>
</ul>
<img src="https://picsum.photos/seed/deep-work-desk/720/360" alt="Không gian làm việc yên tĩnh, tối giản, phù hợp cho một phiên làm việc sâu">
<h2>7. Những sai lầm thường gặp khi mới bắt đầu</h2>
<p>Rất nhiều người thử áp dụng Deep Work trong vài ngày đầu rồi bỏ cuộc, thường vì một trong số những lý do sau:</p>
<ul>
  <li><strong>Đặt mục tiêu quá dài ngay từ đầu.</strong> Nhảy thẳng vào phiên 3 giờ liên tục khi chưa từng luyện tập thường dẫn đến kiệt sức tinh thần và bỏ cuộc. Nên bắt đầu từ 25–45 phút rồi tăng dần.</li>
  <li><strong>Coi đây là "tất cả hoặc không gì cả".</strong> Một ngày không có phiên Deep Work nào không có nghĩa là thất bại — nó chỉ là một điểm dữ liệu để điều chỉnh lịch trình tuần sau.</li>
  <li><strong>Không thông báo với đồng nghiệp.</strong> Nếu không ai biết bạn đang trong "chế độ tập trung", họ sẽ tiếp tục nhắn tin như bình thường — và kỳ vọng phản hồi nhanh như bình thường.</li>
  <li><strong>Nhầm lẫn giữa môi trường yên tĩnh và sự tập trung.</strong> Ngồi trong phòng yên tĩnh nhưng liên tục kiểm tra điện thoại không phải là Deep Work — đó vẫn là Shallow Work, chỉ diễn ra ở một nơi yên tĩnh hơn.</li>
</ul>
<h2>8. Áp dụng Deep Work trong bối cảnh làm việc nhóm</h2>
<p>Một trong những phản biện phổ biến nhất với Deep Work là: "Nghe hay đấy, nhưng công việc của tôi đòi hỏi phối hợp liên tục với người khác — làm sao áp dụng được?" Đây là một lo ngại chính đáng, và câu trả lời không phải là cô lập bản thân hoàn toàn khỏi đội nhóm, mà là <em>tách bạch rõ ràng</em> giữa thời gian phối hợp và thời gian tập trung cá nhân.</p>
<p>Nhiều đội ngũ kỹ thuật hiệu quả áp dụng một mô hình đơn giản: buổi sáng dành cho các cuộc họp đồng bộ ngắn (daily standup, các cuộc thảo luận cần quyết định nhanh), còn buổi chiều được xem là "vùng bảo vệ" — không họp, không tin nhắn không khẩn cấp, chỉ dành để mỗi thành viên tự triển khai phần việc đòi hỏi tư duy sâu của riêng mình. Sự phối hợp không biến mất — nó chỉ được <strong>dồn vào những khung giờ cụ thể</strong>, thay vì rải rác suốt cả ngày và liên tục cắt ngang mọi luồng tư duy sâu.</p>
<blockquote>
  <p>Ghi chú thực tế: một đội ngũ chuyển từ "luôn sẵn sàng phản hồi" sang "phản hồi theo khung giờ cố định 2 lần/ngày" thường mất khoảng hai tuần để mọi người quen với nhịp mới — nhưng sau đó, tốc độ hoàn thành các dự án phức tạp thường cải thiện rõ rệt.</p>
</blockquote>
<p>Điều quan trọng cần lưu ý: mô hình này chỉ hiệu quả nếu có sự đồng thuận ở cấp quản lý, chứ không phải một cá nhân đơn phương "biến mất" khỏi các kênh liên lạc. Deep Work trong môi trường tổ chức là một thỏa thuận văn hóa, không chỉ là một kỹ thuật cá nhân.</p>
<h2>9. Kết luận</h2>
<p>Khả năng làm việc sâu không phải là một tài năng bẩm sinh mà một số người may mắn có được — nó là một kỹ năng, và giống như mọi kỹ năng khác, nó suy yếu nếu không được luyện tập, và cải thiện dần theo thời gian nếu được rèn luyện có chủ đích. Trong một thế giới nơi sự chú ý bị cạnh tranh gay gắt hơn bao giờ hết, khả năng ngồi xuống và tập trung hoàn toàn vào một việc trong một khoảng thời gian đủ dài đang dần trở thành một trong những lợi thế cạnh tranh hiếm hoi nhất — không chỉ với cá nhân, mà với cả những đội ngũ biết cách bảo vệ nó một cách có hệ thống.</p>
<p>Bạn không cần bắt đầu với mô hình Tu viện, không cần biến mất khỏi văn phòng nhiều ngày liền. Bạn chỉ cần một khối thời gian 45 phút, không gián đoạn, mỗi ngày — và sự kiên trì để biến nó thành một thói quen không thể thương lượng.</p>
<p style="text-align: center"><em>Hết bài viết.</em></p>
`.trim();

// A real hosted URL, not a data: URI — `TextEditor`'s Image extension is configured with
// `allowBase64: false` (see text-editor.tsx), so base64 sources are silently dropped on
// parse. This simulates what a real upload endpoint would return.
export function mockImageUpload(_file: File): Promise<string> {
  return new Promise(resolve => setTimeout(() => resolve(`https://picsum.photos/seed/${Date.now()}/640/360`), 800));
}
