import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import com.oreilly.servlet.MultipartRequest;
public class GalleryServlet extends HttpServlet {
public void doPost(HttpServletRequest request, HttpServletResponse response) 
throws ServletException, IOException {
     response.setContentType("text/html");
     PrintWriter out = response.getWriter();
     MultipartRequest m = new MultipartRequest(request,"c:/tomcat/webapps/photogalleryweb/images");
     out.print("successfully uploaded");
   }
}