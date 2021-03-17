import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;

public class GalleryServlet extends HttpServlet {
  
  public void doGet(HttpServletRequest request,
      HttpServletResponse response)
      throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    out.println("<html>\n"+
    "<body>\n"+
    "<h1>Photogallery app</h1>\n"+
    "<h2>Gallery view</h2>\n"+
    "<img src=\"images/a.jpg\" alt=\"a image\" width=\"830\" height=\"415\">\n"+
    "<p>Edit caption</p>\n"+
    "<button type=\"button\" onclick=\"alert('Right')\">Snap</button>\n"+
    "<p></p>\n"+
    "<button type=\"button\" onclick=\"alert('Left')\">Left</button>\n"+
    "<button type=\"button\" onclick=\"alert('Right')\">Right</button>\n"+
    "<p></p>\n"+
    "<button type=\"button\" onclick=\"alert('Search')\">Search</button>\n"+
    "<p>Time textbox</p>\n"+
    "<p>Location textbox</p>\n"+
    "</body>\n"+
    "</html>");
  }
}
