import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;

public class GalleryServlet extends HttpServlet {
  private int mCount;
  
  public void doGet(HttpServletRequest request,
      HttpServletResponse response)
      throws ServletException, IOException {
    String message = "Hits: " + ++mCount;

    response.setContentType("text/plain");
    response.setContentLength(message.length());
    PrintWriter out = response.getWriter();
    out.println(message);
  }
}
