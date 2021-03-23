import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import java.util.Arrays;
public class RenameServlet extends HttpServlet {
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      response.setContentType("text/html");
      PrintWriter out = response.getWriter();
      String filepath = "C:/tomcat/webapps/photogalleryweb/images/";
      String oldFileName = request.getParameter("oldFileName");
      String newCaption = request.getParameter("newCaption");
      String newTime = request.getParameter("newTime");
      String newLocation = request.getParameter("newLocation");

      if(renameFile(filepath,oldFileName,newCaption,newTime,newLocation))
      {
         out.println("File rename successful");
      }
      else
      {
         out.println("File rename failed");
      }  
      out.print("<form action=\"/photogalleryweb/galleryview.html\">\n");
      out.print("<button type=\"submit\"> Okay</button>\n");
      out.print("</form>");
  }

  private boolean renameFile(String path, String oldName, String newName,String newTime, String newLocation) 
  {
     // variable to return for function success
     boolean success;
     
	 String[] photoAttributes = oldName.split("_");
	 
	 if(photoAttributes.length == 1)
	 {
		photoAttributes = Arrays.copyOf(photoAttributes, photoAttributes.length+2);
		 photoAttributes[1] = "unknown date";
		 photoAttributes[2] = "unknown location";
		 
	 }
	 else if(photoAttributes.length == 2)
	 {
		 
		photoAttributes = Arrays.copyOf(photoAttributes, photoAttributes.length+1);
		photoAttributes[2] = "unknown location";
	 }
	 
		 
     // File (or directory) with old name
      File file = new File(path + oldName);

      // File (or directory) with new name
      File file2 = new File(path + newName + "_" + newTime + "_" + newLocation + "_" +".jpg");

      if (file2.exists())
      {
         // File 2 already exists
         success = false;
      }
      else
      {
         // Rename file (or directory)
         success = file.renameTo(file2);
      }

      return success;
  }
}
