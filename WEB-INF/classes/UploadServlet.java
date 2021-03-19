import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import com.oreilly.servlet.MultipartRequest;
public class UploadServlet extends HttpServlet {
public void doPost(HttpServletRequest request, HttpServletResponse response) 
throws ServletException, IOException {
     response.setContentType("text/html");
     PrintWriter out = response.getWriter();
     MultipartRequest m = new MultipartRequest(request,"c:/tomcat/webapps/photogalleryweb/images");
     out.print("<p> Successfully uploaded </p> \n");
     out.print("<form action=\"/photogalleryweb/galleryview.html\">\n");
     out.print("<button type=\"submit\"> Okay</button>\n");
     out.print("</form>");
   }
}